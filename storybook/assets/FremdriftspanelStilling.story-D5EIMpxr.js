import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DhZ6odjH.js";import{w as m,c as D}from"./ContextDecorators-Br_G47wg.js";import{F as N,A as v}from"./FullførtStilling-CvVbjX2H.js";import{R as T}from"./GjenåpneStillingKnapp-Beyhby1q.js";import{T as A}from"./TilgangskontrollForInnhold-DHTUH_4X.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D3Dve5TB.js";import"./OrganisasjonsnummerAlert-BviJ9JMB.js";import"./VStack-BFpIlLyU.js";import"./BasePrimitive-Ofhb2EAm.js";import"./List-Csjqadvv.js";import"./Link-CVCEyY32.js";import"./KandidatHendelseTag-ClNTVVbc.js";import"./Tag-IvE1ESiI.js";import"./ChatExclamationmark-C52cVVmC.js";import"./FileXMark-DJPd0cfS.js";import"./Trash-Bj6CoTrm.js";import"./HandShakeHeart-DQxJHZuq.js";import"./Calendar-NqVtKBdr.js";import"./ThumbUp-zSm5etw3.js";import"./Table-BNblVnDj.js";import"./util-TPcHwbXL.js";import"./format-CSQizK5m.js";import"./match-BcagkmTM.js";import"./parse-DcPhISwL.js";import"./getDefaultOptions-jSIKK2Ms.js";import"./parseISO-VKa_XIl-.js";import"./isBefore-DPyoQYA2.js";import"./util-DPdujr1q.js";import"./accordion-DfKX_W4t.js";import"./index-BeOHxzYE.js";import"./index-SvNVPI6g.js";import"./index-mAHf9UNY.js";import"./ChevronDown-BQcdOcKV.js";import"./Box-DCnO9DY4.js";import"./Bell-BG4iK-2Z.js";import"./PersonChat-aAE97Xg2.js";import"./Eye-DQHqYDnX.js";import"./ProgressBar-ChRV1z0f.js";import"./EyeSlash-tKf2a-Yr.js";import"./CircleSlash-MslFb7fa.js";import"./Modal-qpf7Y554.js";import"./floating-ui.react-7udJG8Yp.js";import"./Date.Input-CNpZwMN3.js";import"./useFormField-Bdv40VSQ.js";import"./useControllableState-XxOyj5-F.js";import"./Modal.context--Sc1y3le.js";import"./Checkbox-DqmAVBu4.js";import"./Fieldset-BBMFHSk3.js";import"./Pencil-BXhq1z1d.js";import"./PersonbrukerTekst-D_QokCdP.js";import"./ClockDashed-5LBOXnwM.js";import"./Tasklist-BNXl4PVS.js";import"./ErrorBoundary-C64-OTmE.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
