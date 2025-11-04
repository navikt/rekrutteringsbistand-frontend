import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-CeRr706s.js";import{w as m,c as E}from"./ContextDecorators-Bfu2QykV.js";import{F as N,A as v}from"./FullførtStilling-D6meX6_X.js";import{R as T}from"./GjenåpneStillingKnapp-D1piL6W5.js";import{T as D}from"./TilgangskontrollForInnhold-BmxNPzj-.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-t-NNv3ML.js";import"./OrganisasjonsnummerAlert-DArB_n8_.js";import"./VStack-BelJx2wb.js";import"./BasePrimitive-bH-Ec4lL.js";import"./List-DubIZyNA.js";import"./Link-GZDYPOdI.js";import"./KandidatHendelseTag-BrwLnTpB.js";import"./Tag-COiHsKc8.js";import"./ChatExclamationmark-BgHOufrW.js";import"./FileXMark-DkNPmIu-.js";import"./Trash-C3RC9Rc8.js";import"./HandShakeHeart-DLwMcxfs.js";import"./Calendar-CZar09bd.js";import"./ThumbUp-DN-XLfoI.js";import"./Table-Cp34OQwR.js";import"./util-D6FuQLJq.js";import"./parse-Lh68j0Qc.js";import"./getDefaultOptions-Cs_8Py5K.js";import"./parseISO-Bt3-2cgb.js";import"./index-CdPV1OIk.js";import"./index-B40KJ5b4.js";import"./isBefore-BnvwDNL_.js";import"./util-8YNgQF5q.js";import"./accordion-Dzirk1tS.js";import"./index-DZ7z7f9P.js";import"./index-vtdQkrMr.js";import"./index-CdXOicBs.js";import"./ChevronDown-DQUdOqVl.js";import"./Box-CVy_0B1R.js";import"./Bell-B37GCSWo.js";import"./PersonChat-BB-gSrc5.js";import"./Eye-BpTrYybw.js";import"./ProgressBar-M0fVPxAa.js";import"./EyeSlash-D60hIhnX.js";import"./CircleSlash-HTsgclPV.js";import"./Modal-CwJOOMmN.js";import"./floating-ui.react-a2IcLYZ2.js";import"./Date.Input-CTpRzzmZ.js";import"./useFormField-DpsMMUoM.js";import"./useControllableState-7aLFU1jC.js";import"./Modal.context-CbsAixuf.js";import"./Checkbox-CEpbqwjP.js";import"./Fieldset-IOXFT7QU.js";import"./Pencil-JfcnNTCC.js";import"./PersonbrukerTekst-CVcH2nSy.js";import"./ClockDashed-ChuuCzId.js";import"./Tasklist-DVWXkOKq.js";import"./ErrorBoundary-BWL9sGK2.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
