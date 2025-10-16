import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-Cg2fkqe5.js";import{w as d,c as D}from"./ContextDecorators-DMXLOF5N.js";import{F as N,A as v}from"./FullførtStilling-DjDpdfTk.js";import{R as T}from"./GjenåpneStillingKnapp-BNE7t2Pr.js";import{T as A}from"./TilgangskontrollForInnhold-DuwfptDz.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-5x_YrBgJ.js";import"./OrganisasjonsnummerAlert-BaRgJY_4.js";import"./VStack-CJSEXM8k.js";import"./BasePrimitive-0Im7KAv4.js";import"./List-BG4EAyn1.js";import"./Link-Dr8mKu-k.js";import"./KandidatHendelseTag-BPUe_dLW.js";import"./Tag-y-rJf116.js";import"./FileXMark-BPHK-K8D.js";import"./Trash-DjZhcdM2.js";import"./HandShakeHeart-Kjo7763n.js";import"./Calendar-DqMB72Zp.js";import"./ThumbUp-ChpcBkVQ.js";import"./Table-DXE3mVNz.js";import"./util-BqwlTJMB.js";import"./format-DoEwAlkH.js";import"./match-C9kk39F-.js";import"./parseISO-D9uFhrVJ.js";import"./parse-peL9KPAb.js";import"./getDefaultOptions-DJEvIq0A.js";import"./util-BKrb1-En.js";import"./accordion-BflpM4lz.js";import"./index-DtbYSZwT.js";import"./index-3wx7sUG8.js";import"./index-ySvqXrZ8.js";import"./ChevronDown-yLvcjboB.js";import"./Box-BNQcTlAN.js";import"./Bell-CJy0pwF3.js";import"./PersonChat-Dsab2kkl.js";import"./Eye-CSmzqbvm.js";import"./ProgressBar-ZxqjKzz3.js";import"./EyeSlash-DRhvIAB2.js";import"./CircleSlash-BVJpIsYl.js";import"./Modal-B_BZTEM4.js";import"./floating-ui.react-D_si1yYR.js";import"./Date.Input-e0IQy6l9.js";import"./useFormField-ByFVRcLz.js";import"./useControllableState-CwuKQ8Mr.js";import"./Modal.context-CyWWEpn_.js";import"./Checkbox-DjUsLFmX.js";import"./Fieldset-By1rOomi.js";import"./Pencil-CN_N2rh4.js";import"./PersonbrukerTekst-DSZRZZvS.js";import"./ClockDashed-Can7mrPV.js";import"./Tasklist-CSJDa5s3.js";import"./ErrorBoundary-DzI40mI-.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
