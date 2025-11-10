import{aE as I,M as w,j as t,q as k,S as j,cy as x,cG as b,cF as g,cz as u,P as y,cV as _}from"./iframe-uGpH5bHE.js";import{w as m,c as A}from"./ContextDecorators-DnXWeFBs.js";import{F as N,A as v}from"./FullførtStilling-DS250b9K.js";import{R as T}from"./GjenåpneStillingKnapp-De84TBVt.js";import{T as E}from"./TilgangskontrollForInnhold-D4sSNYkA.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BNBMcZ4m.js";import"./OrganisasjonsnummerAlert-CrfVppIj.js";import"./VStack-C6U3-jpr.js";import"./BasePrimitive-DdQYhl9r.js";import"./List-6Cq_JyoF.js";import"./Link-_i-0pCB8.js";import"./KandidatHendelseTag-CbIcfoqq.js";import"./Tag-CIu7y533.js";import"./ChatExclamationmark-BGMJYM-O.js";import"./FileXMark-CiYdMBRl.js";import"./Trash-wnzU6iti.js";import"./HandShakeHeart-BBHlLIgg.js";import"./Calendar-EBOO-NN0.js";import"./ThumbUp-DPUW51cg.js";import"./Table-CD4SeFGN.js";import"./util-B5BZJM_V.js";import"./parse-_VpaQtsM.js";import"./getDefaultOptions-CP7UEA2u.js";import"./parseISO-DFYNu8uR.js";import"./index-DzCzZi3c.js";import"./index-B40KJ5b4.js";import"./isBefore-RPGehvCy.js";import"./util-Dr85VjP5.js";import"./accordion-CjKqF_Fn.js";import"./index-tE-ruBPV.js";import"./index-K3V-nKli.js";import"./index-CkIvhGes.js";import"./ChevronDown-DrGBd-hu.js";import"./Box-COCAvjap.js";import"./Bell-BJM8DV8V.js";import"./PersonChat-QTzZk3P1.js";import"./Eye-B413YDlM.js";import"./ProgressBar-BoBPHUWR.js";import"./EyeSlash-CQWZW0K5.js";import"./CircleSlash-CNaeZZyi.js";import"./Modal-DWtSBDNa.js";import"./floating-ui.react-dxPmWD31.js";import"./Date.Input-CDvyQSFD.js";import"./useFormField-Bl3PAVkQ.js";import"./useControllableState-DSpD-_vb.js";import"./Modal.context-e5xMW6Fz.js";import"./Checkbox-CGQnp9W1.js";import"./Fieldset-Dov7r61V.js";import"./Pencil-WB3hm_d6.js";import"./PersonbrukerTekst-BE3HbgaC.js";import"./ClockDashed-Jc8OYfzM.js";import"./Tasklist-C92YwwfS.js";import"./ErrorBoundary-CCxsqcaP.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
