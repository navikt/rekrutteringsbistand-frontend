import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-CIx7wo7D.js";import{w as d,c as D}from"./ContextDecorators-BCkTy9R8.js";import{F as N,A as v}from"./FullførtStilling-BJwaCpdy.js";import{R as T}from"./GjenåpneStillingKnapp-Bt6pkYj5.js";import{T as A}from"./TilgangskontrollForInnhold-CFFjNrTA.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BE8HKbW2.js";import"./OrganisasjonsnummerAlert-DP7OVJ5V.js";import"./VStack-D7okkdd5.js";import"./BasePrimitive-l8vjXYg9.js";import"./List-BcRZRMxq.js";import"./Link-nGzr4IID.js";import"./KandidatHendelseTag-Bs36lIQK.js";import"./Tag-Ch13GRkI.js";import"./FileXMark-b-SwBIUk.js";import"./Trash-DDF0lDvq.js";import"./HandShakeHeart-BeQpNpMA.js";import"./Calendar-DpL55Nco.js";import"./ThumbUp-Dm7v3uRz.js";import"./Table-CncWjAoz.js";import"./util-Dz2WTHUK.js";import"./format-pnjYDM88.js";import"./match-kta7IEBV.js";import"./parseISO-CHHyxPoY.js";import"./parse-uQgzkAwn.js";import"./getDefaultOptions-CVriGt-u.js";import"./util-xzISgwZH.js";import"./accordion-COvUiIqk.js";import"./index-CACXwyfC.js";import"./index-sTbEAteq.js";import"./index-Byn-_oBN.js";import"./ChevronDown-CY3htvpV.js";import"./Box-DYL9eLDZ.js";import"./Bell-BGrur3rV.js";import"./PersonChat-DYP2SH46.js";import"./Eye-CmYKLR_l.js";import"./ProgressBar-XQziMP_N.js";import"./EyeSlash-hRybkJs7.js";import"./CircleSlash-CG4VzY4m.js";import"./Modal-B6NpsmBi.js";import"./floating-ui.react-DWu7eOHT.js";import"./Date.Input-DDJFd5Co.js";import"./useFormField-CpdlRCd5.js";import"./useControllableState-Cn-dqJnK.js";import"./Modal.context-BmX0zHS2.js";import"./Checkbox-DRii_uKe.js";import"./Fieldset-CAqujiMF.js";import"./Pencil-D2MOTzNG.js";import"./PersonbrukerTekst-BPOS782p.js";import"./ClockDashed-CZb_sOWU.js";import"./Tasklist-DSaMPTiq.js";import"./ErrorBoundary-BC2CKbR6.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
