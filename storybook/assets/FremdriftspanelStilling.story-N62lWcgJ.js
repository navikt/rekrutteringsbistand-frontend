import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-CTO0EUng.js";import{w as m,c as D}from"./ContextDecorators-BAmHjqgm.js";import{F as N,A as v}from"./FullførtStilling-eHNINGce.js";import{R as T}from"./GjenåpneStillingKnapp-BAmbfNjy.js";import{T as A}from"./TilgangskontrollForInnhold-LEAFuPQT.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-EAN-fhgR.js";import"./OrganisasjonsnummerAlert-Bhk3fguW.js";import"./VStack-BCKiRHRL.js";import"./BasePrimitive-CZejWwO7.js";import"./List-CRw_TSPx.js";import"./Link-CbwrBY_r.js";import"./KandidatHendelseTag-CVK4sSLI.js";import"./Tag-Clr8NTKJ.js";import"./ChatExclamationmark-BDNecZd7.js";import"./FileXMark-BxTQWum7.js";import"./Trash-DoAk3teY.js";import"./HandShakeHeart-CPkK6ZSa.js";import"./Calendar-DmnC6cqJ.js";import"./ThumbUp-CKlcTpy-.js";import"./Table-T7IlRG3m.js";import"./util-K0h4U2Kh.js";import"./format-DP7EJBYE.js";import"./match-BthhS41u.js";import"./parse-CWgZKNrQ.js";import"./getDefaultOptions-EjekfoSd.js";import"./parseISO-Dr4bGaFw.js";import"./index-CBD4SOv4.js";import"./index-B40KJ5b4.js";import"./isBefore-BX8aPqPK.js";import"./util-CIAlv6iK.js";import"./accordion-CcJ4QILf.js";import"./index-C-pZAY0A.js";import"./index-Jpbiy6D6.js";import"./index-CGV23SyE.js";import"./ChevronDown--jVvHyz6.js";import"./Box-Dpt4cmlj.js";import"./Bell-fx09eLgG.js";import"./PersonChat-BkSweeeT.js";import"./Eye-DNyS1pS3.js";import"./ProgressBar-B6SS3vZ-.js";import"./EyeSlash-6KMZNYP8.js";import"./CircleSlash-dMGKJ1Tc.js";import"./Modal-D3_1GhZF.js";import"./floating-ui.react-B4Z1HLBb.js";import"./Date.Input-6V9AOlG7.js";import"./useFormField-B4NBvQqZ.js";import"./useControllableState-CvQYYuOe.js";import"./Modal.context-DujAwibn.js";import"./Checkbox-C8xzWjyt.js";import"./Fieldset-D20engV2.js";import"./Pencil-DLDTf0KA.js";import"./PersonbrukerTekst-DhpuSaup.js";import"./ClockDashed-CZvbOKJD.js";import"./Tasklist-Cq3A_BGT.js";import"./ErrorBoundary-BbHEJlwz.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
